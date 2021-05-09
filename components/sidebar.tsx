
export default function Sidebar({ children, className }:
    {
        children: any,
        className: any
    }) {
    return (
        <div className={className}>
            {children}
            <div id='TOC'>
                
            </div>
        </div>
    )
}