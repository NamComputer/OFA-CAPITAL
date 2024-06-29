import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      d="M4.333 4.167h17.334c1.191 0 2.166.937 2.166 2.083v12.5c0 1.146-.975 2.083-2.166 2.083H4.332c-1.192 0-2.167-.937-2.167-2.083V6.25c0-1.146.976-2.083 2.167-2.083Z"
      stroke="#A6A6A6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23.833 6.25 13 13.542 2.166 6.25"
      stroke="#A6A6A6"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export default SvgComponent
