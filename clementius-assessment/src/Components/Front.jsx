import React, { useState , useEffect} from 'react';
import Button from "../Components/Buttons";
import Input from "../Components/Input";
import Textarea from "../Components/Textarea";
import { Zoom } from '@material-ui/core';
import axios from "axios";


function Front() {
//  React useState
    const [home , setHome] = useState(true);
    const [click , setClick] = useState(false);
    const [view , setView] = useState(false);
    // useState that set the userdetails and passes the data to server.
    const [content ,setContent] = useState([{
            firstname:"",
            lastname:"",
            email:"",
            dob:"",
            bio:""
        }]);

    const [saved , setSaved] = useState(false);
    const [user , setUser] = useState([]);
    const [submit , setSubmit] = useState(false);
    const [edit , setEdit] = useState(false);
    const [color , setColor] = useState();
    const [saveduser , setSaveduser] = useState("");
    const [updated , setUpdated] = useState({
        updatedname : "",
        updatedvalue : ""
    });

    // --------------------------------------------------------------------
    const [data2 , setData2] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:4000/clem").then(res =>{
            if(res.ok){
                return res.json();
            }
        }).then((data) => setData2(data.data))
    });
    
    // --------------------------------------------------------------------

    function HandleClick(){
        setClick(true);
        setHome(false);
    }

    function HandleView(){
        setClick(false);
        setHome(false);
        setView(true);
    }

    function HandleFields(event){
        const {name , value} = event.target;
        // Update the userfields(content) through "setContent", when the change occurs in the input.
        setContent((prevItems) => {
            return {
                ...prevItems,
                [name] : value
            }
        })
    event.preventDefault();
    }

    // When the form is submitted , the data will be passed to the server through "axios"
    function HandleRegister(event){
        setSubmit(true);
        setUser(() =>{
            axios.post("http://localhost:4000/user/" , content)
            .then(res =>{
                console.log(res);
            })
            .catch(err =>{
                console.log(err);
            })
        });
        
        setInterval(() => {
            setSubmit(false);
            event.preventDefault();
        }, 5000);
    }

    // Function to edit each row when the button is clicked.
    function HandleEdit(event){
        setEdit(true);
    }


    // Function to delete each row in the table.
    function HandleDelete(event){
        let deleteid = event.target.value;
                // Requesting the server to delete the content of the user in database.
            axios.post("http://localhost:4000/delete" , {key : deleteid})
                .then(res=>{
                    console.log(res);
                })
                .catch((err)=>{
                    console.log(err);
            });
        console.log(event.target.value);
    }

    function HandleUpdate(event){
        let editid = event.target.value;
        // Requesting the server to update the content of the user in database.
        axios.post("http://localhost:4000/edit" ,{updateddata:updated})
        .then(res =>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        });
        console.log(event.target.value);
    }

    function Handledata(event){
        console.log(event.target);
        console.log(event.target.name , event.target.value,event.target.placeholder);
        const {name , value}= event.target;
        setUpdated((prevItems) =>{
        return {
            updatedname : name,
            updatedvalue : value
        };
        });
        console.log(updated);
    }
    
    function HandleSave(){
        setView(false);
        setHome(true);
        setSaved(true);
        setTimeout(() => {
            setView(true);
            setHome(false);
        }, 2000);
    }

    function HandleSearch(event){
        let search = event.target.value;
        {for(let i=0;i<data2.length;i++){ 
                let a = search; 
                let b = data2[i].firstname;
                let str1 = a.substring(0 , 1);
                let str2 = b.substring(0 , 1);
                console.log(str1 , str2);
            if(str1 === str2){
                setColor(true);
                setSaveduser(a);
                console.log("Matched");
                break;
            }else{
                setColor(false);
                setTimeout(() => {
                    setColor();
                }, 2000);
                console.log("Not Matched");
            }
        }}
    }


    return (
        <Zoom in="true">
        <span> 
        {/* When the react page is render , this two button (create and view)
                are displayed. */}
                {(home === true)&& 
                <div className="flex homepage">
                {(saved === true)&& <p className="saving">Saving the Changes...</p>}
                        <div className="flex">
                                    <Button 
                                        click={HandleClick}
                                        type="submit"
                                        class="btn"
                                        buttonname="Create"
                                    />
                                    <Button 
                                        click={HandleView}
                                        type="submit"
                                        class="btn"
                                        buttonname="View"
                                    />
                        </div>
                    </div>
                }
               {/* When clicked on create , the form data will be displayed to the user. */}
                {(click === true) && 
                    <form onSubmit={HandleRegister}>
                        <div className="flex_column createpage">
                            <p className="Register_title">Register</p>
                                    <Input
                                        change ={HandleFields}
                                        type="text"
                                        class="userFields"
                                        name="firstname"
                                        placeholder="First-Name"
                                        auto="autofocus"
                                        complete="off"
                                        require="required"
                                    />
                                    <Input
                                        change ={HandleFields}
                                        type="text"
                                        class="userFields"
                                        name="lastname"
                                        placeholder="Last-Name"
                                        auto="autofocus"
                                        complete="off"
                                        require="required"
                                    />
                                    <Input
                                        change ={HandleFields}
                                        type="email"
                                        class="userFields"
                                        name="email"
                                        placeholder="Email"
                                        auto="autofocus"
                                        complete="off"
                                        require="required"
                                    />
                                    <Input
                                        change ={HandleFields}
                                        type="date"
                                        class="userFields"
                                        name="dob"
                                        placeholder="DOB"
                                        auto="autofocus"
                                        complete="off"
                                        require="required"
                                    />
                                    <Textarea 
                                        change ={HandleFields}
                                        name="bio"
                                        class="Bio"
                                        rows="5"
                                        columns="40"
                                        placeholder="Your bio"
                                        require="required"
                                    />
                                    <Button 
                                        type="submit"
                                        class="btn"
                                        buttonname="Register"
                                    /> 
                            <div>
                            {/* The data entered by the user will be displayed for 2seconds. */}
                                {(submit === true) &&
                                <div className="addeduser">
                                    <li>{content.key}</li>
                                    <li>{content.firstname}</li>
                                    <li>{content.lastname}</li>
                                    <li>{content.email}</li>
                                    <li>{content.dob}</li>
                                    <li>{content.bio}</li>
                                </div>
                            }
                            </div>
                        </div>
                        </form>
                        }
                        {/* When the user clicks on the "view" button , the form data 
                                stored in the database will be displayed in the table. */}
                {(view === true)&& 
                
                <div className="flex-column viewpage">
                        <div>
                        <Input 
                            change={HandleSearch}
                            type="search"
                            class="searchfield"
                            name="search"
                            placeholder="Search-user"
                            auto="autofocus"
                            complete="off"
                        />
                        {(color === false)&&<p className="saving">No Matching user found.</p>}
                        {(color === true)&& <p className="saving green">User found.</p>}
                            <table className="table_content">
                                <tbody>
                                <tr>
                                    <th>Key</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>Email</th>
                                    <th>DOB</th>
                                    <th>Bio</th>
                                    <th>Edit/Delete</th>
                                </tr>
                                {/* The userdata is mapped to display each users data. */}
                                {data2.map(each =>
                                    <tr>
                                        <td contentEditable={edit} value = {each.key}>{each.key}</td>
                                        <td 
                                            class = {(color === true && each.firstname.substring(0,1) === saveduser)&& "usersearch"} 
                                
                                            onBlur={Handledata} 
                                            contentEditable={edit} 
                                            value={each.firstname}>
                                            {(edit === false)? each.firstname:
                                                <Input 
                                                        key={each.key}
                                                        name="firstname" 
                                                        class="editdetails" 
                                                        type="text" 
                                                        placeholder={each.firstname}
                                                >{each.firstname}</Input>
                                            }
                                        </td>

                                        <td 
                                        onBlur={Handledata}
                                        contentEditable={edit} 
                                        value={each.lastname}>
                                        {(edit === false)?each.lastname:
                                            <Input 
                                                        key={each.key}
                                                        name="lastname" 
                                                        class="editdetails" 
                                                        type="text" 
                                                        placeholder={each.lastname}
                                                >{each.lastname}</Input>
                                        }
                                        </td>

                                        <td 
                                        onBlur={Handledata}
                                        contentEditable={edit} 
                                        value={each.email}>
                                        {(edit === false)?each.email :
                                            <Input 
                                                        key={each.key}
                                                        name="email" 
                                                        class="editdetails" 
                                                        type="text" 
                                                        placeholder={each.email}
                                                >{each.email}</Input>
                                        }
                                        </td>

                                        <td 
                                        onBlur={Handledata}
                                        contentEditable={edit} 
                                        value={each.dob}
                                        >
                                        {(edit === false)? each.dob :
                                            <Input 
                                                        key={each.key}
                                                        name="dob" 
                                                        class="editdetails" 
                                                        type="text" 
                                                        placeholder={each.dob}
                                                >{each.dob}</Input>
                                        }
                                        </td>

                                        <td 
                                        onBlur={Handledata}
                                        contentEditable={edit} 
                                        value={each.bio}>
                                        {(edit === false)?each.bio : 
                                            <Input 
                                                        key={each.key}
                                                        name="bio" 
                                                        class="editdetails" 
                                                        type="text" 
                                                        placeholder={each.bio}
                                                >{each.bio}</Input>
                                        }
                                        </td>
                                        <td>
                                            <div className="flex wrap">
                                                <Button
                                                    click={HandleEdit}
                                                    class="btn1"
                                                    type="submit" 
                                                    buttonname="Edit"
                                                    value={each.key}
                                                    />
                                                <Button
                                                    click={HandleDelete}
                                                    class="btn1"
                                                    type="submit" 
                                                    buttonname="Delete"
                                                    value={each.key}
                                                />
                                                <Button
                                                    click={HandleUpdate}
                                                    class="btn1"
                                                    type="submit" 
                                                    buttonname="Update"
                                                    value={each.key}
                                                />
                                            </div>
                                        </td>
                                    </tr> 
                                )} 
                                </tbody>
                            </table>
                            {/* Clicked when the user wants to update the contents 
                            in the table.*/}
                            <Button
                            click={HandleSave}
                            type="submit"
                            class="btn"
                            buttonname="Save"
                            ></Button>
                        </div>
                </div>
            }
            </span>
        </Zoom>
    )
}




export default Front;
