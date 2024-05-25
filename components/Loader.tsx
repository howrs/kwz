import React from "react"
import type { SVGProps } from "react"

export function Loader(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <title>Loader</title>
      <path
        fill="currentColor"
        d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.35s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </path>
    </svg>
  )
}

// export function Loader(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="1em"
//       height="1em"
//       viewBox="0 0 24 24"
//       {...props}
//     >
//       <title>Loader</title>
//       <rect width={2.8} height={12} x={1} y={6} fill="currentColor">
//         <animate
//           id="svgSpinnersBarsScale0"
//           attributeName="y"
//           begin="0;svgSpinnersBarsScale1.end-0.1s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="6;1;6"
//         ></animate>
//         <animate
//           attributeName="height"
//           begin="0;svgSpinnersBarsScale1.end-0.1s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="12;22;12"
//         ></animate>
//       </rect>
//       <rect width={2.8} height={12} x={5.8} y={6} fill="currentColor">
//         <animate
//           attributeName="y"
//           begin="svgSpinnersBarsScale0.begin+0.1s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="6;1;6"
//         ></animate>
//         <animate
//           attributeName="height"
//           begin="svgSpinnersBarsScale0.begin+0.1s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="12;22;12"
//         ></animate>
//       </rect>
//       <rect width={2.8} height={12} x={10.6} y={6} fill="currentColor">
//         <animate
//           attributeName="y"
//           begin="svgSpinnersBarsScale0.begin+0.2s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="6;1;6"
//         ></animate>
//         <animate
//           attributeName="height"
//           begin="svgSpinnersBarsScale0.begin+0.2s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="12;22;12"
//         ></animate>
//       </rect>
//       <rect width={2.8} height={12} x={15.4} y={6} fill="currentColor">
//         <animate
//           attributeName="y"
//           begin="svgSpinnersBarsScale0.begin+0.3s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="6;1;6"
//         ></animate>
//         <animate
//           attributeName="height"
//           begin="svgSpinnersBarsScale0.begin+0.3s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="12;22;12"
//         ></animate>
//       </rect>
//       <rect width={2.8} height={12} x={20.2} y={6} fill="currentColor">
//         <animate
//           id="svgSpinnersBarsScale1"
//           attributeName="y"
//           begin="svgSpinnersBarsScale0.begin+0.4s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="6;1;6"
//         ></animate>
//         <animate
//           attributeName="height"
//           begin="svgSpinnersBarsScale0.begin+0.4s"
//           calcMode="spline"
//           dur="0.6s"
//           keySplines=".36,.61,.3,.98;.36,.61,.3,.98"
//           values="12;22;12"
//         ></animate>
//       </rect>
//     </svg>
//   )
// }
