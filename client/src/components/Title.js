import React from 'react'
import Typography from '@material-ui/core/Typography';

export const Title = ({data, noUnderline, subHeader}) => {

    return (
        <div>
            <Typography
                style={{textAlign: "center", color:"#4257b2", marginTop: "20px", marginBottom: "20px"}}
                variant={subHeader ? "h6": "h5"}
            >
                {data}
                <div className={noUnderline ? "": "underline"}></div>
            </Typography>
        </div>
    )
}
