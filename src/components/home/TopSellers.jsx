import React, { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [posts, setPosts] = useState([]);
  const[loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`);
      setPosts(data);
      setLoading(false);
    }
    fetchPosts(); 
   
  },[]);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading ? (
                <> {
                  posts.map((post) => (
                    <li key={post.index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <Skeleton width="100%" height ="40px" borderRadius="100%"/>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author"><Skeleton width="50%" /></Link>
                        <span><Skeleton width="50%" /></span>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <> {
                posts.map((post) => (
                  <li key={post.index}>
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img
                          className="lazy pp-author"
                          src={post.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="author_list_info">
                      <Link to="/author">{post.authorName}</Link>
                      <span>{post.price} ETH</span>
                    </div>
                  </li>
                ))}
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
