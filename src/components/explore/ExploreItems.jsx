import React, {useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CountdownTimer from "../CountdownTimer";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const[loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [postsShown, setPostsShown] = useState(8);
  const [filter, setFilter] = useState("");

  const showMore = () => {
    setPostsShown((prevValue) => prevValue + 4);
  }

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${ filter }`)
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();   
    
  },[filter]);

  function changeFilter(value){
    if(value === "price_low_to_high"){
      setFilter("price_low_to_high");
    }
    if(value === "price_high_to_low"){
      setFilter("price_high_to_low");
    }
    if(value === "likes_high_to_low"){
      setFilter("likes_high_to_low");
    }
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => changeFilter(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        posts.slice(0, 8).map((post) => (
          <div
          key={post.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <Skeleton width="100%" height="50px" borderRadius="100%"/>
              </Link>
            </div>
            <div className={`${post.expiryDate ? "de_countdown" : ""}`}>
              {
                post.expiryDate ?
                  <Skeleton width="100px"/>
                : ""
              }
            </div>

            <div className="nft__item_wrap">
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
              <Link to="/item-details">
                <Skeleton width="100%" height="250px"/>
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4><Skeleton width="50%"/></h4>
              </Link>
              <div className="nft__item_price"><Skeleton width="50px"/></div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span><Skeleton width="15px"/></span>
              </div>
            </div>
          </div>
        </div>
        ))
      ):(
        posts.slice(0, postsShown).map((post) => (
        <div
          key={post.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${post.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
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

            <div className="nft__item_wrap">
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
                <img src={post.nftImage} className="lazy nft__item_preview" alt="" />
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
        </div>
      ))
      )}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" onClick={showMore} className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;