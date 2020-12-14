import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, a as space, e as element, t as text, J as query_selector_all, j as detach_dev, k as claim_space, b as claim_element, f as children, h as claim_text, n as add_location, o as insert_dev, p as append_dev, r as noop } from './client.f70934d3.js';

/* src/routes/partners.svelte generated by Svelte v3.30.1 */

const file = "src/routes/partners.svelte";

function create_fragment(ctx) {
	let t0;
	let h1;
	let t1;
	let t2;
	let ul;
	let li0;
	let t3;
	let t4;
	let li1;
	let t5;
	let t6;
	let li2;
	let t7;

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text("This a list of partners");
			t2 = space();
			ul = element("ul");
			li0 = element("li");
			t3 = text("Partenaire 1");
			t4 = space();
			li1 = element("li");
			t5 = text("Partenaire 2");
			t6 = space();
			li2 = element("li");
			t7 = text("Partenaire 3");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-obqy0f\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "This a list of partners");
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			ul = claim_element(nodes, "UL", {});
			var ul_nodes = children(ul);
			li0 = claim_element(ul_nodes, "LI", {});
			var li0_nodes = children(li0);
			t3 = claim_text(li0_nodes, "Partenaire 1");
			li0_nodes.forEach(detach_dev);
			t4 = claim_space(ul_nodes);
			li1 = claim_element(ul_nodes, "LI", {});
			var li1_nodes = children(li1);
			t5 = claim_text(li1_nodes, "Partenaire 2");
			li1_nodes.forEach(detach_dev);
			t6 = claim_space(ul_nodes);
			li2 = claim_element(ul_nodes, "LI", {});
			var li2_nodes = children(li2);
			t7 = claim_text(li2_nodes, "Partenaire 3");
			li2_nodes.forEach(detach_dev);
			ul_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Partners";
			add_location(h1, file, 4, 0, 55);
			add_location(li0, file, 7, 2, 96);
			add_location(li1, file, 8, 2, 120);
			add_location(li2, file, 9, 2, 144);
			add_location(ul, file, 6, 0, 89);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, ul, anchor);
			append_dev(ul, li0);
			append_dev(li0, t3);
			append_dev(ul, t4);
			append_dev(ul, li1);
			append_dev(li1, t5);
			append_dev(ul, t6);
			append_dev(ul, li2);
			append_dev(li2, t7);
		},
		p: noop,
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(ul);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Partners", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Partners> was created with unknown prop '${key}'`);
	});

	return [];
}

class Partners extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Partners",
			options,
			id: create_fragment.name
		});
	}
}

export default Partners;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydG5lcnMuNjk4YjkxM2EuanMiLCJzb3VyY2VzIjpbXSwic291cmNlc0NvbnRlbnQiOltdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
