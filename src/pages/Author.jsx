import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorItems from "../components/author/AuthorItems";
import Skeleton from "../components/UI/Skeleton";
import AuthorBanner from "../images/author_banner.jpg";

const Author = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState();
  const [button, setButton] = useState("Follow");

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`)
      setPosts(data);
      setFollowers(data.followers);
      setLoading(false);
    }
    fetchPosts(); 
   
  },[]);

  function increment(){
    if(button === "Follow") {
      setButton("Unfollow");
      setFollowers(followers + 1);
    } else {
      setButton("Follow");
      setFollowers(followers - 1);
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
          {
            loading ? (
              <>
                <section>
                  <Skeleton width="100%" height="300px"/>
                </section>

                <section aria-label="section">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d_profile de-flex">
                          <div className="de-flex-col">
                            <div className="profile_avatar">
                            <Skeleton width="35%" height="150px" borderRadius="50%"/>

                              <i className="fa fa-check"></i>
                              <div className="profile_name">
                                <h4>
                                  <Skeleton width="40%"/>
                                  <span className="profile_username"><Skeleton width="20%"/></span>
                                  <span id="wallet" className="profile_wallet"> 
                                    <Skeleton width="100%"/>
                                    {posts.address}
                                  </span>
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="profile_follow de-flex">
                            <div className="de-flex-col">
                              <div className="profile_follower"><Skeleton width="100%"/></div>
                              <Link to="#" onClick={() => increment(posts.followers)} className="btn-main">
                                {button}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="de_tab tab_simple">
                          <AuthorItems />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <>
                <section
                  id="profile_banner"
                  aria-label="section"
                  className="text-light"
                  data-bgimage="url(images/author_banner.jpg) top"
                  style={{ background: `url(${AuthorBanner}) top` }}
                ></section>

                <section aria-label="section">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d_profile de-flex">
                          <div className="de-flex-col">
                            <div className="profile_avatar">
                              <img src={posts.authorImage} alt="" />

                              <i className="fa fa-check"></i>
                              <div className="profile_name">
                                <h4>
                                  {posts.authorName}
                                  <span className="profile_username">@{posts.tag}</span>
                                  <span id="wallet" className="profile_wallet">
                                    {posts.address}
                                  </span>
                                  <button id="btn_copy" title="Copy Text">
                                    Copy
                                  </button>
                                </h4>
                              </div>
                            </div>
                          </div>
                          <div className="profile_follow de-flex">
                            <div className="de-flex-col">
                              <div className="profile_follower">{followers} followers</div>
                              <Link to="#" onClick={() => increment(posts.followers)} className="btn-main">
                                {button}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="de_tab tab_simple">
                          <AuthorItems />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )
          }
      </div>
    </div>
  );
};

export default Author;
