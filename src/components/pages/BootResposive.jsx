
function BootResponsiveMain (props) {
    return(
        <div className="row">
            <div className={props.col}>
                {props.children}
            </div>
        </div>
    )
}

export default BootResponsiveMain