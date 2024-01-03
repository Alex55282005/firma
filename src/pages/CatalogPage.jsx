import axios from "axios";
import "../styles/catalog.css"
import Header from "../scripts/header";
import Footer from "../scripts/footer";
import { API_URL, API1_URL } from "../constants/constants";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import CatalogProducts from "../scripts/CatalogProducts";


const CatalogPage = () =>{
    const location = useLocation();
    const receivedState = location.state;

    const [items, setItems] = useState([]);      

    const getDetails = async () => {
        let {data} = await  axios.get(API_URL+ "categories/");
        data.map(item=>{
            let podCat = item.pod_categories;
            podCat.map((cat)=>{
                if (cat.pod_name == receivedState.name) {
                    return setItems(cat);
                }else{
                    return null;
                }
            });
           
        });
    }    
    const getCar = async () => {
        let {data} = await  axios.get(API1_URL+ "cars/");
        data.map(item=>{
            if (item.brand == receivedState.name) {
                return setItems(item);
            }else{
                return null;
            }
        });
    }    
    useEffect(()=>{
        if (receivedState.id == "car") {
            getCar();
        }else if (receivedState.id == "detal") {
            getDetails();
        }
        
    }, [receivedState]);


    function chek(e) {
        if (e.target.checked == true) {
            console.log(true);
        }else if (e.target.checked == false) {
            console.log(false);
        }
    }
    
    return(
        <div className="container">
            <Header/>
            <div className="main-catalog-cont">
                <div className="filter-cont">
                    <form action="#">
                        <div>
                            <p>ПІДБІР ЗА ПАРАМЕТРАМИ</p>
                        </div>
                        <div>
                            <p>Ціна</p>
                            <label htmlFor="priceMin">Від</label>
                            <input name="priceMin" type="text" id="priceMin"  />
                            <label htmlFor="priceMax">До</label>
                            <input type="text" name="priceMax" id="priceMax" />
                            <button>OK</button>
                            <input type="checkbox" name="" id="" onClick={chek} />
                        </div>
                    </form>
                </div>                
                <CatalogProducts state={items}/>
            </div>
            <Footer/>
        </div>
    );
};

export default CatalogPage;