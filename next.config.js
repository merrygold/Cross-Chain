/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['myimage.net','image.blockchain.news',
    'bit.ly' , 'upload.wikimedia.org' , 'i0.wp.com' ,'static.cryptobriefing.com' ],
  },
};


module.exports = nextConfig;
