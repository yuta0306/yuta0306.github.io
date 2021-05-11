
export default function Sidebar({ children, className }:
    {
        children: any,
        className: any
    }) {
    return (
        <aside className={className}>
            {children}
            <div id='TOC'>
                
            </div>
        </aside>
    )
}