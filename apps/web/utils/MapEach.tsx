import { Children } from "react"

export const MapEach = ({render, of}:{
    render: (item: any)=>any,
    of: any[]
})=>Children.toArray(of).map((item)=>render(item))
