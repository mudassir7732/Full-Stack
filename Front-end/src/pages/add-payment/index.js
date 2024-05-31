const MONTH_OPTIONS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const AddBilling = () => {
    return (
        <div className="w-full bg-white">
            <select
                name=''
                // value={section.month}
                // onChange={handleChange}
                className='bg-[#fefefe] text-[#303030] text-[15px] px-2 font-sans border-[1px] border-[#d0d0d0] rounded-[5px] h-[40px] w-full outline-none font-normal'
            >
                <option value="" label="Select month" />
                {MONTH_OPTIONS.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}
export default AddBilling;