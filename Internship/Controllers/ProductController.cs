using BackendApp.Infrastructure.Irepository;
using BackendApp.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Internship.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        
        //Get all Projects-------------->

        [HttpGet("getall")]
        public IActionResult GetAllCustomer()
        {
            try
            {
                var data = _unitOfWork.product.GetAllAsync();
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

        // GET: Get single project--------->

        [HttpGet("singleproduct/{id:int}")]
        public async Task<ActionResult> Details([FromRoute] int? id)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.product.GetAsync(id);
                    return Ok(data);

                }

                return NotFound($"{id} not found");





            }
            catch (Exception)
            {

                return BadRequest("Server error");
            }
        }

        // POST: Create project------------->

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            try
            {
                if (product != null && ModelState.IsValid)
                {
                    await _unitOfWork.product.createAsync(product);

                    var data = await _unitOfWork.SaveChangesAsync();


                    if (data)
                    {
                        return Ok("Product Created Successfully");
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



        //PUT: Update project----------------->

        [HttpPut("update/{id:int}")]
        public async Task<IActionResult> Edit([FromRoute] int? id, Product product)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.product.UpdateAsync(id, product);
                    if (data)
                    {
                        await _unitOfWork.SaveChangesAsync();
                        return Ok("Product updated Successfully");
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

        // DELETE: Delete project----------------->

        [HttpDelete("delete/{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int? id)
        {
            try
            {
                if (id != null)
                {
                    var data = await _unitOfWork.product.DeleteAsync(id);
                    if (data)
                    {
                        await _unitOfWork.SaveChangesAsync();
                        return Ok("Product Deleted Successfully");
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
