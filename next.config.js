/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains:[
      "res.cloudinary.com"
    ]
  },
  // experimental: {
  //   forceSwcTransforms: true,
  // },
}

module.exports = nextConfig


// module.exports = {
//   images:{
//     domains:["res.cloudinary.com"]
//   }
// }