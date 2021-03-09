const About=()=>"About us page";
const Projects=()=>"Projects page";
const Contact=()=>"Contact Page";
const App = () => {
    const menuItems =[
        {component:<About />, title:"About"},
        {component:<Projects />, title:"Projects"},
        {component:<Contact />, title:"Contact"}
    ];

    const [component, setComponent] = React.useState(menuItems[0].component);

        return (
        <div>
        <div className="nav">
            <ul className="menu">
                {
                menuItems.map((item,i)=>
                    <li key={i} onClick={()=>setComponent(item.component)} className="menu-item">
                    {item.title}
                    </li>
                )
                }
            </ul>
        </div>
        <div className="container">
            {component}
        </div>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById("root"));

//From stack overflow trying to figure out the toggle.  Not needed.