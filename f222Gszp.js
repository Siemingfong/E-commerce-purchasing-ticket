
// For Mac OS 

// /Desktop sieming/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
// npm install chrome-remote-interface

const CDP = require('chrome-remote-interface');
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}   
async function example() {
	let client;
	try {
		// connect to endpoint
		client = await CDP();
		// extract domains
		const {Page, Runtime} = client;
		await Page.enable();
		await Runtime.enable();
		await Page.navigate({url: 'https://www.mochanji.com/products/shop_info.php?product_sernum=201694'});
		await Page.loadEventFired();
		await Runtime.evaluate({expression: "pop_payway('y')"})
		for ( i=0 ; i < 29 ; i++ ){
			await Runtime.evaluate({expression: "set_number_plus();"});
		}
		await Runtime.evaluate({expression: "document.getElementById('virtual1').click();"})
		await Runtime.evaluate({expression: "add_to_cart('y');"})
		await Runtime.evaluate({expression: "document.getElementsByName('same_as_order')[0].click();"})
		await Runtime.evaluate({expression: "document.getElementsByClassName('cart_pay_btn')[0].click()"})
		await sleep(300);
		await Runtime.evaluate({expression: "send();"})
		await sleep(300);
		await Runtime.evaluate({expression: "send();"})
	} catch (err) {
		console.error(err);
	} finally {
		if (client) {
			await client.close();
		}
	}
}

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

example();