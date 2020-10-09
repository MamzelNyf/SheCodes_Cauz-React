import React,{useState} from "react"


function AddPledgeForm ({eventId}){
    const [pledgeValue, setPledgeValue] = useState({
      amount:0,
      comment: "",
      anonymous: false,
      event: eventId
    })
    const token = window.localStorage.getItem("token")

    const postData = async () => {
      console.log(pledgeValue, "pledge before")
        try{
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}pledges/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `token ${token}`
            },    
            body: JSON.stringify(pledgeValue),
          }
        )
        const data = await response.json()
        console.log(pledgeValue, "pledge before")
        window.location.reload();
        return data
        }catch (error) {
              alert("Network error", error.message)
        }
      }

      const handlePostPledge = async (event) => {
        //prevent the default behavior of the form which is rerendering
        event.preventDefault()
          await postData(token)
      }
      
      const handleChange = (event) => {
        const { id, value } = event.target;
        console.log(event.target)
        setPledgeValue((prevPledgeValue) => ({
        ...prevPledgeValue,
        [id]: value,
        }))
      }
    
    return(
      <form onSubmit={handlePostPledge}>
    
        <div>
            <label htmlFor="title">Enter the amount of your pledge: </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter your pledge"
              onChange={handleChange}
              value={pledgeValue.amount}
              onFocus = {(event) => event.target.value = ""} 
            />     
        </div>       
        <button>Pledge it! </button>
        </form>
    )
}

export default AddPledgeForm