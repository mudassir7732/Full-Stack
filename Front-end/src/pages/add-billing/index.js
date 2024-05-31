const MONTH_OPTIONS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const AddBilling=()=>{
    return(
        <div className="w-full bg-white">
            <select>
                <option value="" label='Select Month'>
                    {MONTH_OPTIONS.map((month, index)=>{
                        <option key={index} value={option}>{month}</option>
                    })}
                </option>
            </select>
        </div>
    )
}
export default AddBilling;