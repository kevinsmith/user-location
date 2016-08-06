export default class {
  constructor({
    apiKey,
    cacheTtl = 604800, // 7 days
    fallback = 'exact',
    specificity = 'general',
  }) {
    console.log(apiKey, cacheTtl, fallback, specificity);
  }
}
