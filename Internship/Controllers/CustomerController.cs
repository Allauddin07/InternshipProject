using BackendApp.Infrastructure.Irepository;
using BackendApp.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Internship.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomerController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CustomerController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        // GET: CustomerController
        [HttpGet("getall")]
        public  IActionResult GetAllCustomer()
        {
            try
            {
                var data =  _unitOfWork.customer.GetAllAsync();
                if (data == null)
                {
                    return NotFound();
                }
                return Ok(data);    

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error getting data");
            }
        }

        // GET: CustomerController/Details/5
        [HttpGet("singlecustomer/{id:int}")]
        public async Task<ActionResult> Details([FromRoute]int? id)
        {
            try
            {
                if(id != null)
                {
                    var data = await _unitOfWork.customer.GetAsync(id);
                    return Ok(data);

                }

                return NotFound($"{id} not found");
                

                
                

            }
            catch (Exception)
            {

                return BadRequest("Server error");    
            }
        }

        // GET: CustomerController/Create
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Customer customer)
        {
            try
            {
                if (customer != null && ModelState.IsValid)
                {
                     await  _unitOfWork.customer.createAsync(customer);

                    var data = await _unitOfWork.SaveChangesAsync();


                    if (data)
                    {
                        return Ok("Customer Created Successfully");
                    }
                    else {
                        return BadRequest("something went wrong");
                    }
                    

                }
                else
                {
                    return BadRequest("No Valid");
                }
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error getting data");
            }
        }



        // GET: CustomerController/Edit/5
        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Edit( [FromRoute] int? id, Customer customer)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.customer.UpdateAsync(id, customer);
                    if (data)
                    {
                        await _unitOfWork.SaveChangesAsync();   
                        return Ok("Updated Successfully");
                    }
                    return NotFound($"{id} Not found");
                }
                else
                {
                    return BadRequest("No Valid");
                }
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error getting data");
            }
        }

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute]int? id)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.customer.DeleteAsync(id);
                    if (data)
                    {
                        await _unitOfWork.SaveChangesAsync();
                        return Ok("Deleted Successfully");
                    }
                    return NotFound($"{id} Not found");
                }
                else
                {
                    return BadRequest("No Valid");
                }   

            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError,
                                "Error getting data");
            }
        }


    }
}
