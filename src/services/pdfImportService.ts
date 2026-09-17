import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import { parseResumeText, ParseResult } from './resumeParserService';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export interface PdfExtractResult {
  text: string;
  numPages: number;
  usedOcr: boolean;
  ocrProgress: number;
  warnings: string[];
}

export type ExtractProgressCallback = (progress: number, stage: string) => void;

const OCR_MIN_CONFIDENCE_THRESHOLD = 100;

const fileToUint8Array = (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
};

const extractTextFromPdf = async (
  data: Uint8Array,
  onProgress?: ExtractProgressCallback
): Promise<string> => {
  onProgress?.(5, 'Loading PDF document');
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const numPages = pdf.numPages;
  const pageTexts: string[] = [];

  for (let i = 1; i <= numPages; i++) {
    onProgress?.(5 + Math.floor(((i - 1) / numPages) * 40), `Extracting text from page ${i} of ${numPages}`);
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => item.str || '')
      .join(' ')
      .trim();
    pageTexts.push(pageText);
  }

  onProgress?.(45, 'Text extraction complete');
  return pageTexts.join('\n\n');
};

const renderPageToImage = async (pdf: pdfjsLib.PDFDocumentProxy, pageNum: number): Promise<HTMLCanvasElement> => {
  const page = await pdf.getPage(pageNum);
  const viewport = page.getViewport({ scale: 2 });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: ctx as any, viewport, canvas } as any).promise;
  return canvas;
};

const extractTextWithOcr = async (
  data: Uint8Array,
  onProgress?: ExtractProgressCallback
): Promise<string> => {
  onProgress?.(5, 'Loading PDF for OCR analysis');
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const numPages = pdf.numPages;
  const pageTexts: string[] = [];

  for (let i = 1; i <= numPages; i++) {
    const pageProgressBase = 5 + Math.floor(((i - 1) / numPages) * 90);
    onProgress?.(pageProgressBase, `Rendering page ${i} for OCR`);
    const canvas = await renderPageToImage(pdf, i);

    onProgress?.(pageProgressBase + 10, `Running OCR on page ${i}`);
    const result = await Tesseract.recognize(canvas, 'eng', {
      logger: (m: any) => {
        if (m.status === 'recognizing text') {
          const subProgress = Math.floor(m.progress * 30);
          onProgress?.(pageProgressBase + 10 + subProgress, `OCR page ${i}: ${Math.floor(m.progress * 100)}%`);
        }
      }
    });

    pageTexts.push(result.data.text);
  }

  onProgress?.(95, 'OCR complete, assembling text');
  return pageTexts.join('\n\n');
};

export const extractTextFromPdfFile = async (
  file: File,
  onProgress?: ExtractProgressCallback
): Promise<PdfExtractResult> => {
  const warnings: string[] = [];

  if (file.type !== 'application/pdf') {
    warnings.push('File is not a PDF; attempting to process anyway.');
  }

  const data = await fileToUint8Array(file);
  let usedOcr = false;
  let extractedText = '';
  let ocrProgress = 0;

  try {
    extractedText = await extractTextFromPdf(data, onProgress);

    if (extractedText.trim().length < OCR_MIN_CONFIDENCE_THRESHOLD) {
      warnings.push('PDF contains limited embedded text. Falling back to OCR analysis…');
      usedOcr = true;
      extractedText = await extractTextWithOcr(data, (p, stage) => {
        ocrProgress = p;
        onProgress?.(p, stage);
      });
    }
  } catch (err) {
    console.error('PDF extraction error:', err);
    warnings.push('Direct PDF extraction failed; attempting OCR fallback…');
    usedOcr = true;
    extractedText = await extractTextWithOcr(data, (p, stage) => {
      ocrProgress = p;
      onProgress?.(p, stage);
    });
  }

  if (!extractedText.trim()) {
    warnings.push('No text could be extracted from the PDF. Please try a different file.');
  }

  onProgress?.(100, 'Done');
  return {
    text: extractedText,
    numPages: await pdfjsLib.getDocument({ data }).promise.then(pdf => pdf.numPages),
    usedOcr,
    ocrProgress,
    warnings
  };
};

export const parsePdfFile = async (
  file: File,
  onProgress?: ExtractProgressCallback
): Promise<ParseResult & { usedOcr: boolean }> => {
  const extract = await extractTextFromPdfFile(file, onProgress);
  const parsed = parseResumeText(extract.text);
  parsed.warnings = [...parsed.warnings, ...extract.warnings];
  return { ...parsed, usedOcr: extract.usedOcr };
};
