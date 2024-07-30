export const capiConfig = {
    access_token: 'EAAEj0jl5ilEBO8NOPBE1Q1XqbFg6EZAVlG2k3ZBzoARHLrIUkOJfcHlus2aeUt1khN5ogZAYEZCOVdZC0elTBomIBBIFF6x09gEZCDK9lz4D9WXumJrYvptfJlxs8NNU4CBpyGZCeEisaaWShOq2ZADMOLQZBN8DRZCrSzus5HWXGvl8Qilr2pEiusi3LqZAsiSo3IjJAZDZD',
    pixel_id: '232572856616426',
    api_version: 'v12.0'
}


export const pageview = () => {
    window.fbq('track', 'PageView');
};

// Init FB Pixel
export const initPixel = () => {
    if (!window.fbq) {
      window.fbq = function() {
        window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
      };
      window.fbq.push = window.fbq;
      window.fbq.loaded = true;
      window.fbq.version = '2.0';
      window.fbq.queue = [];
      window.fbq('init', capiConfig.pixel_id);
    }
};