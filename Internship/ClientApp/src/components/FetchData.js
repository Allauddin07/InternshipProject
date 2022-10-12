const fetch =async (dt)=> {

    const data = await fetch(`https://localhost:7144/api/${dt}/getall`, {

        method: "get",

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,
            'Access-Control-Allow-Origin': '*',



        }
    })

    const res = await data.json()
    console.log(res.result)
    return res.result

}

export default fetch
