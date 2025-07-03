import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Graphic Designer",
    "UI/UX Designer",
    "Mobile App Developer",
    "DevOps Engineer",
    "Product Manager",
    "Project Manager",
    "Quality Assurance Engineer",
    "Marketing Specialist",
    "Business Analyst",
    "Content Writer",
    "Software Engineer",
    "Web Developer",
    "Game Developer",
    "Cloud Engineer",
    "AI Engineer",
    "Data Analyst"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="border-2 border-[#B8976A] rounded-full p-2">
                                    <Button onClick={() => searchJobHandler(cat)} variant="outline" className="w-full">
                                        {cat}
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
    

    
}

export default CategoryCarousel