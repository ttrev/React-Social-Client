import { Grid } from '@material-ui/core';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { SyntheticEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";

export let util = { update: (e: any) => { }, cancel: (e: any) => { } };

export default function ResetPassword(){
    const history = useHistory();
    const [newPassword, setNewPassword] = useState("");

    util.update = async (e: SyntheticEvent) => {
        e.preventDefault();
        const user = auth.currentUser;

        try {
            user&&updatePassword(user, newPassword).then(()=>{
              console.log("Reset password successful");
            }).catch((error)=>{
              console.log(error);
            });

            history.push('/profile');
        } catch (err) {
            console.log(err);
        }
    }

    util.cancel = (e: SyntheticEvent) => {
        e.preventDefault();
        history.push('/profile');
    }

    return(
        <div>
            <Grid container direction="column" alignItems="center" justify="center">
                <Card >
                    <Container>
                        <Row>
                            <Col id="editCol1">
                                <div className="form_input-group">
                                    <label style={{color:"black", marginRight:"5px"}}>New Password</label>

                                    <input className="form_input" type="password" required  value={newPassword}

                                        onChange={(e)=>{setNewPassword(e.target.value)}} />
                                </div>
                            </Col>
                        </Row>

                        <Row id="editButtonsRow">
                            <Col id="updateProfileBtnCol">
                                <button data-testid="updateButton" id="UpdateProfile" type="submit" onClick={(e) => util.update(e)} >Reset</button><br />
                            </Col>
                            <Col id="cancelProfileBtnCol">
                                <button data-testid="cancelButton" id="CancelEdits" type="submit" onClick={(e) => util.cancel(e)} >Cancel</button><br />
                            </Col>
                        </Row>
                    </Container>
                </Card>
            </Grid>
        </div>
    )
}