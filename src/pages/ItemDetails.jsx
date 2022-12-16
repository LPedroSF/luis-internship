import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton"

const ItemDetails = () => {
  const {id} = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`)
      setPosts(data);
      setLoading(false);
    }
    fetchPosts(); 
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {
                loading ? (
                  <>
                    <div className="col-md-6 text-center">
                      <Skeleton width="100%" height="550px" borderRadius="10px" />
                    </div>
                    <div className="col-md-6">
                      <div className="item_info">
                        <Skeleton width="100%" height="30px"/>

                        <div className="item_info_counts">
                          <div className="item_info_views">
                            <i className="fa fa-eye"></i>
                            <Skeleton width="60%"/>
                          </div>
                          <div className="item_info_like">
                            <i className="fa fa-heart"></i>
                            <Skeleton width="60%"/>
                          </div>
                        </div>
                        <p>
                          <Skeleton width="100%"/>
                        </p>
                        <div className="d-flex flex-row">
                          <div className="mr40">
                            <div className="item_author">
                              <div className="author_list_pp">
                                <Link to={`/author/${posts.ownerId}`}>
                                  <Skeleton width="100%" height="45px" borderRadius="50%"/>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link to={`/author/`}><Skeleton width="150px"/></Link>
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>
                        <div className="de_tab tab_simple">
                          <div className="de_tab_content">
                            <h6>Creator</h6>
                            <div className="item_author">
                              <div className="author_list_pp">
                                <Link to={`/author/${posts.creatorId}`}>
                                  <Skeleton width="100%" height="45px" borderRadius="50%"/>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link to={`/author/`}><Skeleton width="150px"/></Link>
                              </div>
                            </div>
                          </div>
                          <div className="spacer-40"></div>
                          <h6>Price</h6>
                          <div className="nft-item-price">
                            <Skeleton width="10%" height="30px" borderRadius="50%"/>
                            <span> <Skeleton width="20%" height="30px"/> </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="col-md-6 text-center">
                      <img
                        src={posts.nftImage}
                        className="img-fluid img-rounded mb-sm-30 nft-image"
                        alt=""
                      />
                    </div>
                    <div className="col-md-6">
                      <div className="item_info">
                        <h2>{posts.title} #{posts.tag}</h2>

                        <div className="item_info_counts">
                          <div className="item_info_views">
                            <i className="fa fa-eye"></i>
                            {posts.views}
                          </div>
                          <div className="item_info_like">
                            <i className="fa fa-heart"></i>
                            {posts.likes}
                          </div>
                        </div>
                        <p>
                          {posts.description}
                        </p>
                        <div className="d-flex flex-row">
                          <div className="mr40">
                            <h6>Owner</h6>
                            <div className="item_author">
                              <div className="author_list_pp">
                                <Link to={`/author/${posts.ownerId}`}>
                                  <img className="lazy" src={posts.ownerImage} alt="" />
                                  <i className="fa fa-check"></i>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link to={`/author/${posts.ownerId}`}>{posts.ownerName}</Link>
                              </div>
                            </div>
                          </div>
                          <div></div>
                        </div>
                        <div className="de_tab tab_simple">
                          <div className="de_tab_content">
                            <h6>Creator</h6>
                            <div className="item_author">
                              <div className="author_list_pp">
                                <Link to={`/author/${posts.creatorId}`}>
                                  <img className="lazy" src={posts.creatorImage} alt="" />
                                  <i className="fa fa-check"></i>
                                </Link>
                              </div>
                              <div className="author_list_info">
                                <Link to={`/author/${posts.creatorId}`}>{posts.creatorName}</Link>
                              </div>
                            </div>
                          </div>
                          <div className="spacer-40"></div>
                          <h6>Price</h6>
                          <div className="nft-item-price">
                            <img src={EthImage} alt="" />
                            <span>{posts.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
              
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
