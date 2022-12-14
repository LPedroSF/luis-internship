import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OwlCarousel from 'react-owl-carousel';
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../CountdownTimer";
import '../hooks/countdown.css'

const NewItems = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const settings = {
    margin: 10,
    nav: true,
    loop: true,
    responsive: {
      500: {
        items: 2
      },
      900: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  }

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();

  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {loading ? (
            <>
              <OwlCarousel margin={10} nav loop {...settings}>
                {posts.map((post) => (
                  <div key={post.id} className="nft__item">
                    <div className="author_list_pp" onClick={() => navigate(`${post.authorId}`)}>
                      <Link
                        to={`/author/${post.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={post.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className={`${post.expiryDate ? "de_countdown" : ""}`}>
                      {
                        post.expiryDate ?
                          <CountdownTimer targetDate={post.expiryDate} />
                          : ""
                      }
                    </div>
                    <div className="nft__item_wrap" onClick={() => navigate(`${post.nftId}`)}>
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${post.nftId}`}>
                        <img
                          src={post.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${post.nftId}`}>
                        <h4>{post.title}</h4>
                      </Link>
                      <div className="nft__item_price">{post.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          ) : (
            <>
              <OwlCarousel {...settings}>
                {posts.map((post) => (
                  <div key={post.id} className="nft__item">
                    <div className="author_list_pp" onClick={() => navigate(`${post.authorId}`)}>
                      <Link
                        to={`/author/${post.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <Skeleton width="100%" height="45px" borderRadius="50%"/>
                      </Link>
                    </div>
                    <div className={`${post.expiryDate ? "de_countdown" : ""}`}>
                      {
                        post.expiryDate ?
                          <Skeleton width="100px"/>
                          : ""
                      }
                    </div>
                    <div className="nft__item_wrap" onClick={() => navigate(`${post.nftId}`)}>
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${post.nftId}`}>
                        <Skeleton width="100%" height="270px" borderRadius="10px" />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${post.nftId}`}>
                        <h4><Skeleton width="50%"/></h4>
                      </Link>
                      <div className="nft__item_price"><h4><Skeleton width="25%"/></h4></div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span><Skeleton width="15px"/></span>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
