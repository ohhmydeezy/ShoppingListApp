using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoppinglistAPI.Data;
using shoppinglistAPI.Models;

namespace shoppinglistAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingController : ControllerBase
    {
        private readonly ShoppinglistDbContext _shoppinglistDbContext;

        public ShoppingController(ShoppinglistDbContext shoppinglistDbContext)
        {
            _shoppinglistDbContext = shoppinglistDbContext;
        }

        [HttpGet]
        [Route("GetShopping")]
        public async Task<IActionResult> GetShopping()
        {
            var shoppingItems = await _shoppinglistDbContext.shopping.ToListAsync();
            return Ok(shoppingItems);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] Shopping itemRequest)
        {
            if (itemRequest == null)
            {
                return BadRequest();
            }

            itemRequest.Id = Guid.NewGuid();
            await _shoppinglistDbContext.shopping.AddAsync(itemRequest);
            await _shoppinglistDbContext.SaveChangesAsync();

            return Ok(itemRequest);
        }
    }
}


