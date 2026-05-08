declare module "lucide-react" {
  import * as React from "react"

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string
    absoluteStrokeWidth?: boolean
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >

  export const Plus: LucideIcon
  export const Pencil: LucideIcon
  export const Trash2: LucideIcon
  export const X: LucideIcon
  export const PanelLeftClose: LucideIcon
  export const PanelLeftOpen: LucideIcon
  export const User: LucideIcon
  export const LogOut: LucideIcon
  export const BrainCircuit: LucideIcon
  export const Share2: LucideIcon
  export const ScrollText: LucideIcon
}
