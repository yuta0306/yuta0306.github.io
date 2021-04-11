

export default function Sidebar({ children, className }:
    {
        children: any,
        className: any
    }) {
    return (
        <div className={className}>
            <p>ここサイドバーですね</p>
            {children}
        </div>
    )
}