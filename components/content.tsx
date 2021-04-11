export default function Content({ children, className }: {
    children: any
    className: any
}) {
    return (
        <div className={className}>
            {children}
        </div>
    )
}