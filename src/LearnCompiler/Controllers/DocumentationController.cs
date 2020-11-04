using Microsoft.AspNetCore.Mvc;

namespace LearnCompiler.Controllers
{
    public class DocumentationController : Controller
    {
        public IActionResult Grammar()
        {
            return View();
        }
        public IActionResult Manual()
        {
            return View();
        }
    }
}
