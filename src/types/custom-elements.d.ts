// Type definitions for custom elements and global augmentations

declare namespace JSX {
  interface IntrinsicElements {
    'iconify-icon': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        icon?: string
        width?: string | number
        height?: string | number
        inline?: boolean
        rotate?: string | number
        flip?: string
      },
      HTMLElement
    >
  }
}

export {}
