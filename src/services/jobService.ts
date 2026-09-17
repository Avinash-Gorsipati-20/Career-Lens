export interface CompanySource {
  id: string;
  company: string;
  officialCareerUrl: string;
  sourceStatus: 'manual_link_only';
}

export const COMPANY_SOURCES: CompanySource[] = [
  ['Google', 'https://careers.google.com/'],
  ['Microsoft', 'https://careers.microsoft.com/'],
  ['Amazon', 'https://www.amazon.jobs/'],
  ['Apple', 'https://jobs.apple.com/'],
  ['Meta', 'https://www.metacareers.com/'],
  ['Accenture', 'https://www.accenture.com/in-en/careers'],
  ['IBM', 'https://www.ibm.com/careers'],
  ['Oracle', 'https://www.oracle.com/in/careers/'],
  ['Adobe', 'https://careers.adobe.com/'],
  ['Salesforce', 'https://careers.salesforce.com/'],
  ['NVIDIA', 'https://www.nvidia.com/en-us/about-nvidia/careers/'],
  ['Intel', 'https://jobs.intel.com/'],
  ['Cisco', 'https://jobs.cisco.com/'],
  ['SAP', 'https://jobs.sap.com/'],
  ['Tata Consultancy Services', 'https://www.tcs.com/careers'],
  ['Infosys', 'https://www.infosys.com/careers'],
  ['Wipro', 'https://careers.wipro.com/'],
  ['HCLTech', 'https://www.hcltech.com/careers'],
  ['Capgemini', 'https://www.capgemini.com/careers/'],
  ['Cognizant', 'https://careers.cognizant.com/'],
  ['Dell Technologies', 'https://jobs.dell.com/'],
  ['HP', 'https://jobs.hp.com/'],
  ['Qualcomm', 'https://www.qualcomm.com/company/careers'],
  ['Broadcom', 'https://www.broadcom.com/company/careers'],
  ['ServiceNow', 'https://careers.servicenow.com/'],
  ['Workday', 'https://workday.wd5.myworkdayjobs.com/Workday'],
  ['Uber', 'https://www.uber.com/us/en/careers/'],
  ['Airbnb', 'https://careers.airbnb.com/'],
  ['PayPal', 'https://www.paypal.com/us/brc/article/careers'],
  ['Visa', 'https://corporate.visa.com/en/careers.html'],
  ['Mastercard', 'https://www.mastercard.com/global/en/vision/corp-responsibility/our-people/careers.html'],
  ['Stripe', 'https://stripe.com/jobs'],
  ['Atlassian', 'https://www.atlassian.com/company/careers'],
  ['Dropbox', 'https://jobs.dropbox.com/'],
  ['Spotify', 'https://www.lifeatspotify.com/jobs'],
  ['JPMorgan Chase', 'https://www.jpmorganchase.com/careers'],
  ['Goldman Sachs', 'https://www.goldmansachs.com/careers'],
  ['Morgan Stanley', 'https://www.morganstanley.com/people-opportunities'],
  ['KPMG', 'https://kpmg.com/xx/en/home/careers.html'],
  ['DXC Technology', 'https://dxc.com/us/en/careers'],
  ['NTT DATA', 'https://us.nttdata.com/en/careers'],
  ['Fujitsu', 'https://global.fujitsu/en/careers'],
  ['Hitachi', 'https://careers.hitachi.com/'],
  ['Mphasis', 'https://careers.mphasis.com/'],
  ['Persistent Systems', 'https://www.persistent.com/careers/'],
  ['Zoho', 'https://www.zoho.com/careers/'],
  ['Tech Mahindra', 'https://careers.techmahindra.com/'],
  ['Siemens', 'https://www.siemens.com/global/en/company/jobs.html'],
  ['Bosch', 'https://www.bosch.com/careers/'],
  ['Ericsson', 'https://www.ericsson.com/en/careers']
].map(([company, officialCareerUrl]) => ({
  id: company.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  company,
  officialCareerUrl,
  sourceStatus: 'manual_link_only'
}));
