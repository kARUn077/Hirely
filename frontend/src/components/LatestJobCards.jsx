import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-5 rounded-md shadow-xl bg-[#f4e1d2] border border-[#a88e6c] cursor-pointer hover:shadow-2xl transition-shadow duration-300'
        >
            <div>
                <h1 className='font-medium text-lg text-[#5a4432]'>{job?.company?.name}</h1>
                <p className='text-sm text-[#7d5a3f]'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 text-[#5a4432]'>{job?.title}</h1>
                <p className='text-sm text-[#6b4f32]'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary ? `${(job.salary / 100000).toFixed(1)} LPA` : 'N/A'}</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
