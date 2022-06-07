import React from "react";
import Header from "./Header";

const item=[];

export default class Fetch extends React.Component{

    state={
        loading: true,
        person: null,
    }

    async componentDidMount(){
        const url="https://hms-nist.herokuapp.com/api/vendor";
        const response = await fetch(url);
        const data = await response.json();
        for(let i=data.user.length-1;i>=-1;i--){
            this.setState({person: data, loading: false})
            item.push(data.user[i]);
            console.log(data.user[0])
        }
    }

    render(){
        return <div>
            <Header />
            <center><h1>Purchase History</h1></center>
            <br/>

            <div className="container-fluid">
                <table className="table table-borderless table-responsive" style={{width:"60%", textAlign:"left",margin:"0 auto 5% auto"}}>
                
                <thead>
                <tr style={{backgroundColor:"#46244C",color:"white"}}>
                    <th>Date & Time</th>
                    <th>Vendor</th>
                    <th>Items Bought</th>
                    <th>Amount Paid</th>
                </tr>
                </thead>
                <tbody>{item.map(i =>
                <tr>
                    <td>{i.date}</td>
                    <td>{i.name}</td>
                    <td>{i.fooditem}</td>
                    <td><strong>₹</strong> {i.payment} /-</td>
                </tr>
                )}</tbody>

            </table>
            </div>
        </div>
    }
}