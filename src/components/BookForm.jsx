import React from "react";
import Form from "./common/form";
import Joi from 'joi-browser';
import { getGenres } from "../services/genreService";
import { getBook, saveBook,updateBook } from './../services/ebookService';
import { getJwt } from "../services/auth";
import { toast, ToastContainer } from 'react-toastify';

class BookForm extends Form {
  state = {
    data: {
      title: "",
      author: "",
      genreId: "",
      cost: "",
      purchasedBy: "",
    },
    genres:[],
    errors:{}
  };

  schema = {
    _id:Joi.string(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    genreId: Joi.string().required(),
    cost: Joi.number().required(),
    purchasedBy:Joi.number()
  };

  doSubmit=async ()=>{
    const jwt=getJwt();
    if(!jwt){
      toast.error('Please Login..');
      //this.props.history.push('/login');
    }
    if(!this.state.data._id)
      await saveBook(this.state.data);
    else await updateBook(this.state.data);
    this.props.history.push('/books');
  }

 async componentDidMount() {
    const {data:genres}=await getGenres();
    this.setState({genres});

    const bookId=this.props.match.params.id;
    if(bookId==='new') return;

    try{
      const {data:book}=await getBook(bookId);
      this.setState({data:this.mapToBookModel(book)});
    }
    catch (ex){
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }

  }

  mapToBookModel=(book)=>{
    return {
      _id:book._id,
      title:book.title,
      author:book.author,
      genreId:book.genre._id,
      cost:book.cost,
      purchasedBy:book.purchasedBy
    };
  }

  render() {
   
    return (
      <React.Fragment>
        <h1>BookForm</h1>
        <ToastContainer/>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text", true)}
          {this.renderInput("author", "Author", )}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("cost", "Cost", )}
          {this.renderInput("purchasedBy", "Purchased By", )}
          {this.renderButton('Save')}
        </form>
      </React.Fragment>
    );
  }
}

export default BookForm;
