import React,{useState, useEffect} from "react";
import ReactToPdf from "react-to-pdf";
import Header from './Header.js'

const item=[];

export default class Fetch extends React.Component{
    
    state={
        loading: true,
        person: null,
    }

    async componentDidMount(x){
        const url="https://hms-nist.herokuapp.com/api/generatereport"
        const response = await fetch(url);
        const data = await response.json();
        if(x==null){
            for(let i=0;i<=data.user.length;i=i+1){
                this.setState({person: data, loading: false})
                item.push(data.user[i]);
                // console.log(data.user.length-1);
            }
        }
        else if(x!=null){
            item.length=0;
            const b = data.user.length;
            
            for(let i=0;i<b;i=i+1){
                this.setState({person: data, loading: false})
                
                if(data.user[i].room == x || data.user[i].block.toUpperCase()==x.toUpperCase()){
                    item.push(data.user[i]);
                }
                if(x.toLowerCase()=="boys wing" && data.user[i].room ==10){
                    item.push(data.user[b-1]);
                }
            }
        }  
    }
    
    goback() {
        window.location.href="/wardendashboard"
    }

    refreshPage(){
        window.location.href="/generatereport"
    }

    render(){
        const len=item.length; // To Calculate the total number of rooms present
        var occupants=0;
        for(var i=0;i<item.length;i=i+1){
            occupants=occupants+item[i].occupancy;
        }

        const ref = React.createRef();
        const options = {
            orientation: 'landscape',
        };

        const headingStyle={
            marginTop:"2%",
            marginBottom:"1%"
        }

        const clearStyle={
            float:"left",
            marginTop:"10%",
            marginBottom:"5%",
            borderRadius:"25px",
            height:"45% "
        }

        const inputSearch={
            borderRadius:"25px"
        }

        const tableStyle={
            textAlign:"center",
            margin: "0 auto",
            width:"40%"
        }

        return (
            <div>
                <Header />
                <div className="box">
                    
                    <div style={{width: "100%", height: "100%", textAlign: "center"}} ref={ref}>
                        
                        <h1 style={headingStyle}>Hostel Report</h1>

                        <div className="row">
                            <div className="col-lg-6" style={{backgroundColor:"white", width:"25%", textAlign:"center", marginRight:"7%", marginLeft:"17%", paddingTop:"0.9%", color:"black", borderRadius:"25px", marginTop:"2%", marginBottom:"0%", border:"1px solid black"}}>
                                <p>Total Number of Rooms: {len}</p>
                            </div>
                            <div className="col-lg-6" style={{backgroundColor:"white", width:"25%", textAlign:"center", marginRight:"7%", marginLeft:"10%", paddingTop:"0.9%", color:"black", borderRadius:"25px", marginTop:"2%", marginBottom:"0%", border:"1px solid black"}}>
                                <p>Total Number of Students: {occupants}</p>
                            </div>
                        </div><br/>
                        
                        {/* Input and Clear Button */}
                                <input className="search-bar rounded-pill" type="text" placeholder=" &#xf002; Search"
                                onChange={(evt) => {var x=evt.target.value; 
                                this.componentDidMount(x) }} />
                                <button className="btn btn-dark clr-btn rounded-pill" onClick={this.refreshPage}>Clear</button>
                                <br/><br/>
                        <div>
                        
                            <table style={tableStyle} className="table table-borderless">
                                <thead>
                                    <tr className="row" style={{backgroundColor:"#46244C",color:"white", marginTop:"2%"}}>
                                        <th className="col">Block</th>
                                        <th className="col">Room</th>
                                        <th className="col">Occupancy</th>
                                    </tr>
                                </thead>
                                
                                <div>{item.map(i=>
                                    <tr className="row">
                                        <td className="col">{i.block}</td> 
                                        <td className="col">{i.rid}</td>
                                        <td className="col">{i.occupancy}</td>
                                    </tr>
                                )}</div>
                            </table>
                        </div> 
                    </div>

                    {/* Lower Two Buttons */}
                    <div className="row" style={{marginTop:"4%",marginBottom:"3%"}}>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <button className="btn btn-dark btn-control rounded-pill" style={{float:"right"}} onClick={this.goback}><i className="fas fa-arrow-left"></i> Go Back</button>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <ReactToPdf options={options} targetRef={ref} filename="Hostel-Report.pdf">
                                {({toPdf}) => (
                                    <button className="btn btn-light btn-control rounded-pill" style={{float:"left"}} onClick={toPdf}><i className="fas fa-print"></i> PDF</button>
                                )}
                            </ReactToPdf>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
