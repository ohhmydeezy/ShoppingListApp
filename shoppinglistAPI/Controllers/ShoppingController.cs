using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shoppinglistAPI.Data;
using shoppinglistAPI.Models;
using System;
using System.Threading.Tasks;

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

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetShopping([FromRoute] Guid id)
        {
            var shoppingItem = await _shoppinglistDbContext.shopping.FirstOrDefaultAsync(x => x.Id == id);

            if (shoppingItem == null)
            {
                return NotFound();
            }
            return Ok(shoppingItem);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateItem([FromRoute] Guid id, [FromBody] Shopping updateItemRequest)
        {
            var shoppingItem = await _shoppinglistDbContext.shopping.FindAsync(id);

            if (shoppingItem == null)
            {
                return NotFound();
            }

            // Update properties
            shoppingItem.Item = updateItemRequest.Item;
            shoppingItem.Quantity = updateItemRequest.Quantity;

            // Save changes to the database
            await _shoppinglistDbContext.SaveChangesAsync();

            return Ok(shoppingItem);
        }
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteItem([FromRoute] Guid id)
        {
            var shoppingItem = await _shoppinglistDbContext.shopping.FindAsync(id);

            if(shoppingItem == null)
            {
                return NotFound();
            }
            _shoppinglistDbContext.shopping.Remove(shoppingItem);
            await _shoppinglistDbContext.SaveChangesAsync();

            return Ok();
        }

    }
}


