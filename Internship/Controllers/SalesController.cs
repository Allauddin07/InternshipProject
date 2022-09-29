using BackendApp.Infrastructure.Irepository;
using BackendApp.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Internship.Controllers
{
    [Route("api/sales")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public SalesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        // GET: Get all sales----------->

        [HttpGet("getall")]
        public IActionResult GetAllCustomer()
        {
            try
            {
                var data = _unitOfWork.sale.GetAllAsync();
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
        [HttpGet("singlesale/{id:int}")]
        public async Task<ActionResult> Details([FromRoute] int? id)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.sale.GetAsync(id);
                    return Ok(data);

                }

                return NotFound($"{id} not found");





            }
            catch (Exception)
            {

                return BadRequest("Server error");
            }
        }

        // POST: Create Sale------------->
        // 
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Sales sale)
        {
            try
            {
                if (sale != null && ModelState.IsValid)
                {
                    //sale.DateSold.ToString("MM/dd/yyyy");
                    await _unitOfWork.sale.createAsync(sale);

                    var data = await _unitOfWork.SaveChangesAsync();


                    if (data)
                    {
                        return Ok("Sales Created Successfully");
                    }
                    else
                    {
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



        // PUT: Update Single Sale---------->

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Edit([FromRoute] int? id, Sales sale)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.sale.UpdateAsync(id, sale);
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

        //DELETE: Delete Single Sale--------->

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.sale.DeleteAsync(id);
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
