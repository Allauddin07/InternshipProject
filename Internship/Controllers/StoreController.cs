using BackendApp.Infrastructure.Irepository;
using BackendApp.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Internship.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public StoreController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        // GET: Get All Stores--------->

        [HttpGet("getall")]
        public IActionResult GetAllCustomer()
        {
            try
            {
                var data = _unitOfWork.store.GetAllAsync();
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

        // GET:  Get Single Store---------->
         
        [HttpGet("singlecustomer/{id:int}")]
        public async Task<ActionResult> Details([FromRoute] int? id)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.store.GetAsync(id);
                    return Ok(data);

                }

                return NotFound($"{id} not found");





            }
            catch (Exception)
            {

                return BadRequest("Server error");
            }
        }

        // POST: Create single Store------------>

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Store store)
        {
            try
            {
                if (store != null && ModelState.IsValid)
                {
                    await _unitOfWork.store.createAsync(store);

                    var data = await _unitOfWork.SaveChangesAsync();


                    if (data)
                    {
                        return Ok("Store Created Successfully");
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



        // PUT: Update single Store------->

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Edit([FromRoute] int? id, Store store)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.store.UpdateAsync(id, store);
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
         
        //DELETE: Delete single store------>

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.store.DeleteAsync(id);
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
