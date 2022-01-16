import React,{useState} from 'react'
import './greed.css'
import Modal from "@material-ui/core/Modal";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { makeStyles } from "@material-ui/core/styles";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 280,
    height: 360,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    storyroot: {
      display: "flex",
      "& > *": {
        margin: theme.spacing(1),
      },
    },

    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  },
}));

function Greed  ({ post }) {
    console.log(post);
    const [deletedid, setid] = useState();
    const [caption, setcaption] = useState();
    const [open, setOpen] = useState(false );
    const [modalStyle] = useState(getModalStyle);
    const classes = useStyles();
   
  const deleteAd =  async()  => {
    // alert(deletedid);
        // e.preventDefault();
        console.log(deletedid);
        const res = await fetch("/deletePost" ,{
          method : "POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            "postId": deletedid,
          })     
     });
    
     const data = await res.json();
      console.log(data);
     if(!data)
     {
       window.alert("Error occured");
      
     }
     else{
       window.alert(" Advertisement Deleted Successfully");
      console.log(data);
     }
        
      };
    function deleteid(id) {
        setid(id);
        console.log(deletedid);
        deleteAd();
      }
         
      const updateAd =  async(e)  => {

        // e.preventDefault();
        // console.log(date);
        const res = await fetch("/editPost" ,{
          method : "POST",
          headers:{
            "Content-Type":"application/json",
            // "authorization":"bearer "+localStorage.getItem("jwt")
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
         "postId": deletedid ,
         "postContent" : caption
           
          })
         
     });
    
     const data = await res.json();
     console.log(data);
     if(!data)
     {
       window.alert("Error");
      
     }
     else{
       window.alert(" Advertisement updated Successfully");
       console.log(data);
      
     
     }
     
        
      };

    return (
        <div className="greed">
            <div class="container">

                <div class="gallery">
                    {
                        post ?
                            <div>
                                {post.map((post) => {
                                    
                                    return (
                                        <div class="gallery-item" tabindex="0">

                                            <img className="gallery-image-me" src={post.image} alt=""></img>

                                            <div class="gallery-item-info">

                                                <ul>
                                                    {/* <li class="gallery-item-likes"><span class="visually-hidden">Likes:</span><i class="fas fa-heart" aria-hidden="true"></i> {post.like[0]?.count}</li> */}
                                                  <button className='btn-ed'   onClick={() => {setid( post.postId);  deleteAd();}} >Delete  <DeleteOutlineIcon style={{fontSize:"20px"}}/></button> 
                                                  <button className='btn-ed' onClick={() => { setOpen(true);setid(post.postId);setcaption(post.postContent)}}>Edit <EditIcon style={{fontSize:"20px"}}/> </button>
                                                </ul>
                                            </div>

                                        </div>)
                                })}
                            </div>

                            : <h1>loading...</h1>

                    }

                </div>
                {/* <!-- End of gallery --> */}

                {/* <div class="loader"></div> */}
        <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <h2 className="modal__headerImage">Update Ad</h2>
            </center>
            <Input
              type="text"
              placeholder="Caption"
              value={caption}
              // value={name}
              onChange={(e) => setcaption(e.target.value)}
              className="signup_input"

            />

            <Button type="submit" variant="contained" color="secondary"   onClick={updateAd}>
              Update
            </Button>

            <div className="signInLabel">
              {/* <img
                className="modal__headerImage"
                src="https://i.pinimg.com/originals/8a/77/05/8a770507298d728a1e3e039a0507dd8e.png"
                alt="instagram"
                className="signInLabelImg"
              />
              <p className="signInLabelText">Sed ut perspiciatis unde omnis iste natus error sit voluptatem Sed ut perspiciatis unde omnis iste natus error ut perspiciatis unde omnis iste natus error </p> */}
            </div>
          </form>
        </div>
      </Modal>

            </div>

        </div>
    )
}

export default Greed
