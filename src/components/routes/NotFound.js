const NotFound = (props) => {

    return (
        <div style={{ marginTop: "30vh", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <div className="alert alert-danger" role="alert" style={{ width: "100%", height: "20vh" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px" }}> Page Not Found</div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px" }}> 404</div>
            </div>
        </div>
    )
}

export default NotFound