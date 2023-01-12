import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../Redux/Slice'
import { useForm } from "react-hook-form";
import { Modal } from '@mantine/core';

export const Home = () => {

    const [opened, setOpened] = useState(false);
    const [capsuleDetail, setCapsuleDetail] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const data = useSelector((state) => state?.dataSlice?.intialData)

    const onSubmit = (data) => {
        const payload = {
            type: data.type,
            status: data.status,
            launch_date: data.launch_date
        }
        dispatch(fetchData(payload))
    }

    const handleCardClick = (capsule) => {
        setOpened(true)
        setCapsuleDetail(capsule?.item)
    }

    // Pagination

    useEffect(() => {
        const payload = {
            page: currentPage
        }
        dispatch(fetchData(payload))
    }, [currentPage])


    const pageCount = Math.ceil(data?.campaign?.total_count / data?.campaign?.per_page)
    const allPage = [];
    for (let index = 1; index <= pageCount; index++) {
        allPage.push(index)
    }

    const pagination = (pageNo) => {
        setCurrentPage(pageNo)
    }

    const previewPage = () => {
        if (currentPage == 1 || data?.campaign?.total_count < data?.campaign?.per_page) { }
        else {
            setCurrentPage(currentPage - 1)
        }
    }

    const nextPage = () => {
        if (currentPage == pageCount || data?.campaign?.total_count < data?.campaign?.per_page) { }
        else {
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div>
            <div>
                <img src="https://image.cnbcfm.com/api/v1/image/105958327-1560179865119gettyimages-1062199522.jpeg?v=1560179889" alt="no image" className='banner' height="400px" width="1400px" />
            </div>
            <div className='drop-down container'>
                <div className='row'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <select className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12' {...register("type")}>
                        <option value="">All</option>
                        {
                            data && data?.type_options?.map((item, i) => {
                                return (
                                    <>
                                        <option key={i} value={item.type}>{item.type}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                    <select className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12' {...register("status")}>
                        <option value="">All</option>
                        {
                            data && data?.status_options?.map((item, i) => {
                                return (
                                    <option key={i} value={item.status}>{item.status}</option>
                                )
                            })
                        }
                    </select>
                    <select className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12' {...register("launch_date")}>
                        <option value="">All</option>
                        {
                            data && data?.original_launch_options?.map((item, i) => {
                                return (
                                    <option key={i} value={item.original_launch}>{item.original_launch}</option>
                                )
                            })
                        }
                    </select>
                    <button className='btn btn-primary col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12' type="submit">Submit</button>
                </form>
                </div>
            </div>
            <div className='container'>
                <div className='row '>
                    {
                        data && data?.campaign?.data?.map((item, i) => {
                            return (
                                <div className="card col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12 card-design" onClick={() => handleCardClick({ item })}>
                                    <img key={i} className="card-img-top" src="https://thumbs.dreamstime.com/z/illustration-deep-space-spacex-logo-over-vector-planet-195641418.jpg" alt="Card image cap" />
                                    <div className="card-body" >
                                        <h5 className="card-title">Id : {item.id}</h5>
                                        <p>Type: {item.type}</p>
                                        <p>Status: {item.status}</p>
                                        <p className="card-text">Capsule Serial : {item.capsule_serial}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
            
                <nav className='d-flex justify-content-center'>
                    <ul className='pagination'>
                        <li className='page-link active buttons' onClick={() => previewPage()}>Prev</li>
                        {
                            allPage?.map((page, i) => {
                                return (<>
                                    <li key={i} className={
                                        page === currentPage ? "page-item active" : "page-item"
                                    }>
                                        <p className='page-link' onClick={() => pagination(page)}>{page}</p> </li>
                                </>
                                )
                            })
                        }
                        <li className="page-link active buttons" onClick={() => nextPage()} > Next </li>
                    </ul>
                </nav>
            </div>

            <Modal opened={opened} onClose={() => setOpened(false)} withCloseButton={false}>
                Capsule Id : {capsuleDetail?.capsule_id} ,
                Capsule Serial : {capsuleDetail?.capsule_serial} ,
                Id : {capsuleDetail?.id} ,
                Landings : {capsuleDetail?.landings} ,
                Mission : {capsuleDetail?.mission} ,
                Original Launch : {capsuleDetail?.original_launch} ,
                Original Launch Unix : {capsuleDetail?.original_launch_options} ,
                Reuse Count : {capsuleDetail?.reuse_count} ,
                Status : {capsuleDetail?.status} ,
                Type : {capsuleDetail?.type}
            </Modal>
        </div>
    )
}