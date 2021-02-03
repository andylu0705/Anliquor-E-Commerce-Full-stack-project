import React from 'react'
import {Helmet} from "react-helmet";

const Meta = ({title,description, keywords}) => {
    return (
        <Helmet>
        <title>{title}</title>
        <meta name= 'description' content={description} />
        <meta name= 'keywords' content={keywords} />
    </Helmet>
    )
}


Meta.defaultProps = {
    title:'Welcome To Anliquor',
    description : "We sell best wine for cheap",
    keywords: "Wiskey, Vodka, Wine, Gin"

}

export default Meta
