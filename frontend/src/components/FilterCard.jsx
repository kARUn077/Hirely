import { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        key: "location",
        array: [
            { label: "Delhi NCR", value: "Delhi NCR" },
            { label: "Bangalore", value: "Bangalore" },
            { label: "Hyderabad", value: "Hyderabad" },
            { label: "Pune", value: "Pune" },
            { label: "Mumbai", value: "Mumbai" },
            { label: "Chennai", value: "Chennai" },
            { label: "Kolkata", value: "Kolkata" },
            { label: "Ahmedabad", value: "Ahmedabad" },
            { label: "Remote", value: "Remote" },
        ]
    },
    {
        filterType: "Industry",
        key: "industry",
        array: [
            { label: "Frontend Developer", value: "Frontend Developer" },
            { label: "Backend Developer", value: "Backend Developer" },
            { label: "Full Stack Developer", value: "Full Stack Developer" },
            { label: "Data Scientist", value: "Data Scientist" },
            { label: "Machine Learning Engineer", value: "Machine Learning Engineer" },
            { label: "UI/UX Designer", value: "UI/UX Designer" },
            { label: "Software Engineer", value: "Software Engineer" },
            { label: "Product Manager", value: "Product Manager" },
            { label: "Quality Analyst", value: "Quality Analyst" },
            { label: "DevOps Engineer", value: "DevOps Engineer" },
        ]
    },
    {
        filterType: "Salary",
        key: "salary",
        array: [
            { label: "0 - 40k", value: JSON.stringify([0, 40000]) },
            { label: "42k - 1 lakh", value: JSON.stringify([42000, 100000]) },
            { label: "1 lakh - 5 lakh", value: JSON.stringify([100000, 500000]) },
            { label: "5 lakh - 10 lakh", value: JSON.stringify([500000, 1000000]) },
            { label: "10 lakh - 20 lakh", value: JSON.stringify([1000000, 2000000]) },
            { label: "20 lakh - 50 lakh", value: JSON.stringify([2000000, 5000000]) },
            { label: "Above 50 lakh", value: JSON.stringify([5000000, Infinity]) },
        ]
    }
];

const FilterCard = () => {
    const [filters, setFilters] = useState({
        location: '',
        industry: '',
        salary: ''
    });

    const dispatch = useDispatch();

    const changeHandler = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    useEffect(() => {
        dispatch(setSearchedQuery(filters));
    }, [filters,dispatch]);

    return (
        <div className='w-full bg-[#f4e1d2] p-5 rounded-md shadow-lg border border-[#d3b29d]'>
            <h1 className='font-bold text-lg text-[#5a4432]'>Filter Jobs</h1>
            <hr className='mt-3' />
            {
                filterData.map((data, index) => (
                    <div key={index} className="mt-4">
                        <h1 className='font-bold text-md text-[#5a4432]'>{data.filterType}</h1>
                        <RadioGroup
                            value={filters[data.key]}
                            onValueChange={(value) => changeHandler(data.key, value)}
                        >
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                                            <RadioGroupItem value={item.value} id={itemId} className="text-[#6b4f32]" />
                                            <Label htmlFor={itemId} className="text-[#6b4f32]">{item.label}</Label>
                                        </div>
                                    );
                                })
                            }
                        </RadioGroup>
                    </div>
                ))
            }
        </div>
    );
};

export default FilterCard;
