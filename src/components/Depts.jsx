import DeptStyle from './css/depts.module.css';
function Depts(){
    return(
        <div className={DeptStyle.dept_container}>
            <header>
                <h1>Streams</h1>
            </header>
            <main>
                <section className={DeptStyle.department}></section>
            </main>
        </div>
    );
}
export default Depts;