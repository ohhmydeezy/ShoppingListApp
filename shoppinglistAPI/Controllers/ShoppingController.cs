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
            var shoppingItems = await _shoppinglistDbContext.Shopping.ToListAsync();
            return Ok(shoppingItems);
        }

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] AddShoppingItem itemRequest)
        {
            if (itemRequest == null)
            {
                return BadRequest();
            }
            var shopping = new Shopping
            {
                Id = Guid.NewGuid(),
                Item = itemRequest.Item,
                Quantity = itemRequest.Quantity
            };

            await _shoppinglistDbContext.Shopping.AddAsync(shopping);
            await _shoppinglistDbContext.SaveChangesAsync();

            return Ok(itemRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetShopping([FromRoute] Guid id)
        {
            var shoppingItem = await _shoppinglistDbContext.Shopping.FirstOrDefaultAsync(x => x.Id == id);

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
            var shoppingItem = await _shoppinglistDbContext.Shopping.FindAsync(id);

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
        public async Task<IActionResult> DeleteItem([FromRoute] Guid id)
        {
            var shoppingItem = await _shoppinglistDbContext.Shopping.FindAsync(id);

            if(shoppingItem == null)
            {
                return NotFound();
            }
            _shoppinglistDbContext.Shopping.Remove(shoppingItem);
            await _shoppinglistDbContext.SaveChangesAsync();

            return Ok();
        }

    }
}


