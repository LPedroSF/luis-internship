import { render } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState, useRef} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import Skeleton from "../UI/Skeleton";


const HotCollections = () => {
  const { nftId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const settings = {
    responsive:{
      500: {
        items: 2
      },
      900: {
        items:3
      },
      1200: {
        items:4
      }
    }
  }
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections/nftId`)
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();    
  },[]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {
            loading ?
              <OwlCarousel
                loop
                margin={10}
                nav
                {...settings}
                >
                {posts.map((post) => (
                    <div key ={post.id} className="nft_coll" >
                      <div className="nft_wrap">
                        <Link to={`/item-details/${nftId}`}>
                          <img src={post.nftImage} className="lazy img-fluid" alt=""/>
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${nftId}`}>
                          <img className="lazy pp-coll" src={post.authorImage} alt=""/>
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{post.title}</h4>
                        </Link>
                        <span>ERC-{post.code}</span>
                      </div>
                    </div>
                ))} 
              </OwlCarousel> 
            : (
              <OwlCarousel
                  loop
                  margin={10}
                  nav
                  {...settings}
                >
                  {posts.map((post) => (
                      <div className="nft_coll" key ={post.id}>
                        <div className="nft_wrap">
                          <Link to={`/item-details/`}>
                            <Skeleton width="100%" height="200px"/>
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <Skeleton width ="100%" height="40px" borderRadius="100%"/>
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <Skeleton width="70%"/>
                          </Link>
                          <br />
                          <span><Skeleton width="50px" /></span>
                        </div>
                      </div>
                  ))} 
                </OwlCarousel>
              )
          }
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
