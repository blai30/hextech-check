import { SVGProps } from 'react'

const ChestIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => {
  return (
    <svg
      {...props}
      fill="currentColor"
      stroke="currentColor"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 64 64"
    >
      <path d="M60 10.72C60 7.010875 56.989125 4 53.28 4H10.72C7.010875 4 4 7.010875 4 10.72v42.56C4 56.989125 7.010875 60 10.72 60h42.56c3.709125 0 6.72-3.010875 6.72-6.72V10.72Zm-5.999875 0v42.56c0 .39725-.322875.720125-.720125.720125H10.72c-.39725 0-.720125-.322875-.720125-.720125V10.72c0-.39725.322875-.720125.720125-.720125h42.56c.39725 0 .720125.322875.720125.720125Z" />
      <path d="m4 9.522 14 12.289V40l14 10 14-10V21.811L60 9.522C54.478 4 9.522 4 4 9.522ZM32 40l-5.995-4V20L32 16l5.995 4v16L32 40Z" />
    </svg>
  )
}

export default ChestIcon
